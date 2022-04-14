import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/?key=26561926-b4a1cd5696abc50a17fae36e8';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
}

    async getImages() {
        console.log(this);
        const url = `${BASE_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        try {
    const response = await axios.get(url);
            this.incremenPage();

            // console.log(response.data);
            return response.data;

            
  } catch (error) {
            console.error(error.message);
        }

    }

    incremenPage() {
                    this.page += 1;
    }

    resetPage() {
                this.page = 1;

    }
        

    get query() {
        return this.searchQuery;
    }

set query(newQuery) {
    this.searchQuery = newQuery;
    }

}

