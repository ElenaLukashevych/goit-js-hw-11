const BASE_URL = `https://pixabay.com/api/?key=26561926-b4a1cd5696abc50a17fae36e8`;
 
export async function fetchImages(image) {
    const url = `${BASE_URL}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;

    try {
        const response = await fetch(url);
        const img = await response.json();

        
        return img;

        

    } catch (error) {
        console.log(error.message);
    }

};

