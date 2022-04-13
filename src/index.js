import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

import { getRefs } from './js/get-refs';
import ImageApiService from './js/image-service';

import image from './templates/images.hbs';

const refs = getRefs();
const imageApiService = new ImageApiService();

// const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: 'alt' });


refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onFormSubmit(event) {
    event.preventDefault();
    imageApiService.resetPage();
    clearContainer();
    
    imageApiService.query = event.currentTarget.elements.searchQuery.value.toLowerCase().trim();

     if (imageApiService.query === '') {
                 onError();
        return
    };


    imageApiService.fetchImages().then(createMarkup);
    
    

   
        refs.formEl.reset();

};

function createMarkup(data) {
    // console.log(data.hits.length);
    // console.log(data.totalHits);

    if (data.totalHits === 0) {

        onError();
        return;

    } else if (imageApiService.page === 2) {

        let totalHits = data.totalHits;
        
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        
    } else if (data.totalHits !== 0 && data.hits.length === 0) {

          Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }

  
   
      refs.galleryEl.insertAdjacentHTML('beforeend', image(data.hits));
      
};


function onError() {
 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

};


function onLoadMore() {

imageApiService.fetchImages().then(createMarkup)
};

function clearContainer() {
     refs.galleryEl.innerHTML = '';

};



