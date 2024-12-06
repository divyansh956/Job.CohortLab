import app from "./app.js";
import cloudinary from "cloudinary";


// connecting backend to cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})





// PORT
app.listen(process.env.PORT, () =>{
    console.log(`Buddy, Server is running on port ${process.env.PORT}`);
})

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
