import * as SQLite from 'expo-sqlite';
import { Place } from './models/place';

const database = SQLite.openDatabase('places.db');

export function init(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    latitude REAL NOT NULL,
                    longitude REAL NOT NULL
                )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });

    return promise;
}

export function insertPlace(place){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
              `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
              [
                place.title,
                place.imageUri,
                place.address,
                place.location.latitude,
                place.location.longitude,
              ],
              (_, result) => {
                resolve(result.insertId);
              },
              (_, error) => {
                reject(error);
              }
            );
        })
    })

    return promise;
}

export function fetchPlaces(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    const places = [];

                    for (const item of result.rows._array){
                        places.push(new Place(
                            item.title,
                            item.imageUri,
                            {
                                address: item.address,
                                latitude: item.latitude,
                                longitude: item.longitude,
                            },
                            item.id
                        ))
                    }

                    resolve(places);
                },
                (_, error) => {
                    reject(error);
                }
            )
        });
    });

    return promise;
}

export function fetchPlaceDetails(id){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places WHERE id = ?`,
                [id],
                (_, result) => {
                    const placeObj = result.rows._array[0];
                    const place = new Place(
                        placeObj.title,
                        placeObj.imageUri,
                        {
                            address: placeObj.address,
                            latitude: placeObj.latitude,
                            longitude: placeObj.longitude,
                        },
                        placeObj.id
                    );

                    resolve(place);
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    })

    return promise;
}