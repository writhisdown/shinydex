'use strict';

const displayDate = () => {

    window.onload = () => {

        const dateWrapper = document.getElementById('pubYear');
        dateWrapper.innerHTML = new Date().getFullYear();
        console.log('loaded');

    }

}

export {displayDate}