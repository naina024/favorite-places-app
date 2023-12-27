
class Place{
    constructor(title, imageUri, address, location){
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location; // like - {latitude: 0.123, longitude: 12.2367}
        this.id = new Date().toString() + Math.random().toString();
    }
}