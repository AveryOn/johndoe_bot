import axios from "axios";


// Функция для получения случайного мема
export async function getRandomMeme() {
    try {
      const response = await axios.get('https://meme-api.com/gimme');
      return response.data.url; // Ссылка на мем
    } catch (error) {
      console.error('Ошибка при получении мема:', error);
      return null;
    }
  };