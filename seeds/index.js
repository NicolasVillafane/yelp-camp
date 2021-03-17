const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const price = Math.floor(Math.random() * 20) + 1;
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "60461cac296dfa2cdf38551f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac neque maximus, ultricies odio non, vehicula erat.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/dzasnya6i/image/upload/v1615644852/YelpCamp/hac03gy5dfmyk1midl4r.png",
          filename: "YelpCamp/hac03gy5dfmyk1midl4r",
        },
        {
          url:
            "https://res.cloudinary.com/dzasnya6i/image/upload/v1615644853/YelpCamp/gb91h6zuqoeqepsfb7wf.jpg",
          filename: "YelpCamp/gb91h6zuqoeqepsfb7wf",
        },
        {
          url:
            "https://res.cloudinary.com/dzasnya6i/image/upload/v1615644852/YelpCamp/bl3osrepfxhcdceidghi.jpg",
          filename: "YelpCamp/bl3osrepfxhcdceidghi",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
