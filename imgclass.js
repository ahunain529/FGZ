let selectedImage;

// Function to preview the selected image
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const preview = document.getElementById('preview');
    preview.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
  selectedImage = event.target.files[0];
}

// Function to classify the image
async function classifyImage() {
  if (!selectedImage) {
    alert('Please select an image.');
    return;
  }

  // Load the MobileNet model
  const model = await mobilenet.load();

  // Convert the image to a tensor
  const imageElement = document.getElementById('preview');
  const imageTensor = tf.browser.fromPixels(imageElement).toFloat();

  // Resize the image to fit the model input
  const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]).div(tf.scalar(255));

  // Get the model's predictions
  const predictions = await model.classify(resizedImage);

  // Display the predictions
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<h2>Classification Results:</h2>';
  predictions.forEach(prediction => {
    resultsDiv.innerHTML += `<p>${prediction.className}: ${Math.round(prediction.probability * 100)}%</p>`;
  });

  // Provide recommendations based on the classification
  provideRecommendations(predictions);
}

// Function to provide recommendations based on classification results
function provideRecommendations(predictions) {
  // Example recommendations based on the top prediction
  const topPrediction = predictions[0].className.toLowerCase();
  const recommendationsDiv = document.getElementById('recommendations');

  switch (topPrediction) {
    case 'crop':
      recommendationsDiv.innerHTML = '<h2>Recommendations:</h2><p>This image contains a crop. You can enhance the crop yield by applying appropriate fertilizers and pesticides.</p>';
      break;
    case 'disease':
      recommendationsDiv.innerHTML = '<h2>Recommendations:</h2><p>This image contains a crop disease. To reduce the spread of the disease, consider removing infected plants and applying appropriate fungicides.</p>';
      break;
    case 'pest':
      recommendationsDiv.innerHTML = '<h2>Recommendations:</h2><p>This image contains a pest. To reduce pest damage, consider using biological controls or pesticides.</p>';
      break;
    default:
      recommendationsDiv.innerHTML = '<h2>Recommendations:</h2><p>No specific recommendations available.</p>';
  }
}