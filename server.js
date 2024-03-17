import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

let app = express();
let port = 3000;
let api_url = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", async (req, res) => {
 try{
  let response = await axios(`${api_url}/posts`)
  let result = response.data
  res.render(`index.ejs`, {posts: result})

 }
 catch(error){
  console.error(`Failed to make request`, error.message)
  res.sendStatus(400)
 }
});


app.get("/new", (req, res) => {
  res.render("modify.ejs", 
  { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    let response = await axios.get(`${api_url}/posts/${req.params.id}`);
    let result = response.data
    console.log(result);
    res.render("modify.ejs", {heading: "Edit Post", submit: "Update Post", post: result,});
  } 
  catch (error) {
    console.error(`Failed to make request`, error.message)
    res.json({error:`Error creating post`})
  }
});


app.post("/api/posts", async (req, res) => {
    try{
      let response = await axios.post(`${api_url}/posts`, req.body)
      let result = response.data
      res.render(`index.ejs`, {posts: result})
 
    }
    catch(error){
      console.error(`Failed to make request`, error.message)
      res.json({error:`Error creating post`})
    }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
   try{
    let response = await axios.patch(`${api_url}/posts/${req.params.id}`, req.body)
    let result = response.data
    res.render(`index.ejs`, {posts: result})

   }
   catch(error){
    console.error(`Failed to make request`, error.message)
    res.json({error:`Error creating post`})
   }
  
});


app.get("/api/posts/delete/:id", async (req, res) => {
  try {
   let response = await axios.delete(`${api_url}/posts/${req.params.id}`);
   let result = response.data
   console.log(result)
   res.render(`index.ejs`, {posts: result})
    
  } catch (error) {
    console.error(`Failed to make request`, error.message)
    res.json({error:`Error creating post`})
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
