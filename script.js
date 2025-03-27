// Инициализация карты
const map = L.map('map').setView([65, -150], 4); // Центр Аляски, масштаб 4

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Загрузка данных из JSON
fetch('alaska_data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(point => {
      const marker = L.marker([point.latitude, point.longitude]).addTo(map);

      marker.bindPopup(point.name); // Простое всплывающее окно

      marker.on('click', function() { // Подробная информация в info panel
        document.getElementById('info-content').innerHTML = `
          <h3>${point.name}</h3>
          <p>${point.description}</p>
          <img src="${point.image}" alt="${point.name}">
          <p>Тип: ${point.type}</p>
        `;
      });
    });
  })
  .catch(error => console.error('Ошибка загрузки данных:', error));
