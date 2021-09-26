const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require('method-override')

mongoose.connect("mongodb://localhost/blog");

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => {
//     console.log("DB Connected!");
//   })
//   .catch((err) => {
//     console.log(Error, err.message);
//   });

// setting up view  engine
app.set("view engine", "ejs");

// telling app to use the router that we created
// every route we create in articleroute is going to be
//  added tpo --> /articles

// below actually saying that we can access different parameters from our article
// form inside our
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  // const articles = [
  //   {
  //     title: "Test Article",
  //     createdAt: new Date(),
  //     description: "Test Description",
  //   },
  //   {
  //     title: "Test Article 2",
  //     createdAt: new Date(),
  //     description: "Test Description",
  //   },
  // ];
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
