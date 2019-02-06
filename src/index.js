const tableBody = document.querySelector('#table-body')
const winnerName = document.querySelector('#winner')
const API_URL = `http://localhost:3000/a_cappella_groups`

const fetchSchools = () => {
  return fetch(API_URL)
    .then(res => res.json())
}

const renderAllSchools = (schoolsArray) => {
  schoolsArray.forEach(addSchoolToTable);
  addCrowningEventToSchools();


  // explicit parameter passing
  // schoolsArray.forEach((school) => addSchoolToTable(school))
}

const addSchoolToTable = (school) => {
  tableBody.innerHTML += `
    <tr class="singleSchool">
      <td>${school.college.name}</td>
      <td>${school.name}</td>
      <td>${school.membership}</td>
      <td>${school.college.division}</td>
      <td>
        <img src='./assets/trophy.png' class="trophy" data-id='${school.id}' />
      </td>
    </tr>
  `
}

const addCrowningEventToSchools = () => {
  let trophyPictures = document.querySelectorAll('.trophy');

  trophyPictures.forEach(trophyPicture => {
    trophyPicture.addEventListener('click', (event) => {
      fetch(API_URL + `/${event.target.dataset.id}`)
        .then(res => res.json())
        .then(groupData => nameWinner(groupData))

      trophyPicture
        .parentNode
        .parentNode
        .remove()
    })
  });
}

const nameWinner = (winningGroup) => {
  const winnerHeadline = document.querySelector('#winner');
  winnerHeadline.innerHTML = '';
  winnerHeadline.innerHTML += `Winner: ${winningGroup.college.name} ~ ${winningGroup.name}`;
}


document.addEventListener('DOMContentLoaded', () => {
 fetchSchools()
  .then(schools => renderAllSchools(schools))
})

// listElement.forEach(element => element.addEventListener('click', () => element.remove()));
// listElement.forEach(element => element.addEventListener('click', (e) => moveEl(e))
// listElement.addEventListener('click', () => {listElement.remove()});
