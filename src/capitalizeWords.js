function capitalizeWords(params) {
  const mySentence = params;

  const finalSentence = mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  return finalSentence;
}
export default capitalizeWords;
