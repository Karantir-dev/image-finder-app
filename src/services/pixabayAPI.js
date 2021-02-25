// export default function pixabayFetch(searchQuery, pageNumber) {
//   const KEY = '19409083-c44dedced2b14f118a69bc1b1';
//   const BASE_URL = 'https://pixabay.com/api/';

//   return fetch(
//     `${BASE_URL}?q=${searchQuery}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error('Что-то пошло не так =('));
//   });
// }
