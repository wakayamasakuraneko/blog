let selectedGenre = '全ての記事'; // 初期状態で表示させるテキスト

// 初期状態で選択されているジャンルを表示させる
displaySelectedGenre();

function showGenre(genre) {
  const articlesContainer = document.getElementById('articles-container');
  const allArticles = articlesContainer.querySelectorAll('.genre');

  // 全ての記事を非表示にする
  allArticles.forEach(article => {
    article.classList.add('hidden');
  });

  // 選択されたジャンルの記事だけを表示
  const selectedGenreElements = document.querySelectorAll(`.genre[data-genre*="${genre}"]`);
  selectedGenreElements.forEach(element => {
    element.classList.remove('hidden');
  });

  // 選択されているジャンルを更新
  selectedGenre = genre;

  // 選択されているジャンルを表示させる
  displaySelectedGenre();
}

function showAllArticles() {
  const articlesContainer = document.getElementById('articles-container');
  const allArticles = articlesContainer.querySelectorAll('.genre');

  // 全ての記事を表示
  allArticles.forEach(article => {
    article.classList.remove('hidden');
  });

  // 選択されているジャンルをクリア
  selectedGenre = '全ての記事';

  // 選択されているジャンルを表示させる
  displaySelectedGenre();
}

// 選択されているジャンルをスマホ版のヘッダー部分「id="selected-genre-display」に表示させる
function displaySelectedGenre() {
  const displayElement = document.getElementById('selected-genre-display');

  if (selectedGenre) {
    displayElement.textContent = `選択中のジャンル: ${selectedGenre}`;
  } else {
    displayElement.textContent = '全ての記事';
  }
}
