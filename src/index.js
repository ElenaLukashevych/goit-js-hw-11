import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { getRefs } from './js/get-refs';
import ImageApiService from './js/image-service';
import LoadMoreBtn from './js/load-more-btn';

import image from './templates/images.hbs';

const {formEl, galleryEl} = getRefs();
const imageApiService = new ImageApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  className: 'is-hidden',
  isHidden: true,
  onClick: () => {
    onLoadMore();
  },
});


const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });


formEl.addEventListener('submit', onFormSubmit);



function onFormSubmit(event) {
    event.preventDefault();
    imageApiService.resetPage();
    clearContainer();

    

    imageApiService.query = event.currentTarget.elements.searchQuery.value.toLowerCase().trim();

    if (imageApiService.query === '') {
        loadMoreBtn.hide();
        onError();

        return
    };


    imageApiService.getImages().then(createMarkup);
    
        loadMoreBtn.show();

   
        formEl.reset();

};

function createMarkup(data) {
    // console.log(data.hits.length);
    // console.log(data.totalHits);

    if (data.totalHits === 0) {
        loadMoreBtn.hide();

        onError();

        return;

    } else if (imageApiService.page === 2) {

        let totalHits = data.totalHits;
        
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        
    } else if (data.totalHits !== 0 && data.hits.length === 0) {
        loadMoreBtn.hide();


        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");

    }

  

    galleryEl.insertAdjacentHTML('beforeend', image(data.hits));

};




function onLoadMore() {

    imageApiService.getImages().then(createMarkup);
        lightbox.refresh();


};

function clearContainer() {
     galleryEl.innerHTML = '';

};

function onError() {
 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

};


