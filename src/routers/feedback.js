const express = require('express');
const multer = require('multer');
const axios = require('axios');

const feedbackRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

feedbackRouter.post('/submit-feedback', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'textFile', maxCount: 1 }]), async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const image = req.files['image'] ? req.files['image'][0].buffer : null;
    const textFile = req.files['textFile'] ? req.files['textFile'][0].buffer.toString() : null;

    // Save to MongoDB (replace this with your actual database logic)
    // const order = new Order({ rating, feedback, image, textData: textFile });
    // await order.save();

    // Assuming 'your-facebook-token' is a valid access token obtained from Facebook Graph API
    const facebookToken = 'your-facebook-token';

    // Post review to Facebook
    if (facebookToken) {
      const facebookPostResponse = await axios.post(
        `https://graph.facebook.com/me/feed?access_token=${facebookToken}`,
        { message: `Rating: ${rating}, Feedback: ${feedback}` }
      );
      console.log('Review posted on Facebook:', facebookPostResponse.data);
    }

    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = feedbackRouter;
