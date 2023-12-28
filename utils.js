// todo
const GOOGLE_API_KEY = '';

export function getMapPreview(){
    const mapPreviewUrl = ``;
    return mapPreviewUrl;
}

export async function getAddress(lat, lng){
    const url = ``;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Failed to fetch address!');
    }
    
    const data = response.json();
    const address = data.results[0].formatted_address;
    return address;
}