const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let postItList = [
  {
    id: "0",
    title: "PostIt Title 1",
    date: "2021-01-01",
    time: "00:00",
    labels: ["label1", "label2"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    imageUrl: "https://picsum.photos/id/1/300/200",
    priority: "low",
    dueDate: "2021-01-01",
    dueTime: "00:00",
    featured: true,
  },
  {
    id: "1",
    title: "PostIt Title 2",
    date: "2021-01-01",
    time: "00:00",
    labels: ["label1", "label2"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    imageUrl: "https://picsum.photos/id/2/300/200",
    priority: "medium",
    dueDate: "2021-01-01",
    dueTime: "00:00",
    featured: false,
  },
  {
    id: "2",
    title: "PostIt Title 3",
    date: "2021-01-01",
    time: "00:00",
    labels: ["label1", "label2"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    imageUrl: "https://picsum.photos/id/3/300/200",
    priority: "high",
    dueDate: "2021-01-01",
    dueTime: "00:00",
    featured: false,
  },
  {
    id: "3",
    title: "PostIt Title 4",
    date: "2021-01-01",
    time: "00:00",
    labels: ["label1", "label2"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    imageUrl: "https://picsum.photos/id/4/300/200",
    priority: "low",
    dueDate: "2021-01-01",
    dueTime: "00:00",
    featured: true,
  },
];

let postIt = {
  id: null,
  title: null,
  date: null,
  time: null,
  labels: [],
  content: null,
  imageUrl: null,
  priority: null,
  dueDate: null,
  dueTime: null,
  featured: false,
};

let response = {
  error: false,
  codigo: 200,
  message: "",
};
app.get("/", function (req, res) {
  response = {
    error: true,
    codigo: 200,
    message: "API REST working. You can use /board /postit endpoints",
  };
  res.send(response);
});
app.route("/board").get(function (req, res) {
  response = {
    error: false,
    codigo: 200,
    message: "",
  };
  response = {
    error: false,
    codigo: 200,
    message: "PostIt list",
    board: postItList,
  };
  res.send(response);
});
app
  .route("/postit")
  .get(function (req, res) {
    if (!req.body.id) {
      response = {
        error: true,
        codigo: 502,
        message: "Required parameter id",
      };
    } else {
      const postIt = postItList.find((postIt) => postIt.id === req.body.id);
      if (postIt) {
        response = {
          error: false,
          codigo: 200,
          message: "PostIt found",
          postit: postIt,
        };
      } else {
        response = {
          error: true,
          codigo: 503,
          message: "PostIt doesn't exist",
        };
      }
    }
    res.send(response);
  })
  .post(function (req, res) {
    if (
      !req.body.id ||
      !req.body.title ||
      !req.body.content ||
      !req.body.labels
    ) {
      response = {
        error: true,
        codigo: 502,
        message: "id, title, content and labels are required",
      };
    } else {
      if (postItList.find((item) => item.id === req.body.id)) {
        response = {
          error: true,
          codigo: 503,
          message: "PostIt already created",
        };
      } else {
        postIt = {
          id: req.body.id,
          title: req.body.title,
          date: req.body.date,
          time: req.body.time,
          labels: req.body.labels,
          content: req.body.content,
          imageUrl: req.body.imageUrl,
          priority: req.body.priority,
          dueDate: req.body.dueDate,
          dueTime: req.body.dueTime,
          featured: req.body.featured,
        };

        postItList.push(postIt);
        response = {
          error: false,
          codigo: 200,
          message: "PostIt created",
          postit: postIt,
        };
      }
    }

    res.send(response);
  })
  .delete(function (req, res) {
    if (!postItList.find((item) => item.id === req.body.id)) {
      response = {
        error: true,
        codigo: 501,
        message: "PostIt not deleted",
      };
    } else {
      postItList = postItList.filter((item) => item.id !== req.body.id);

      response = {
        error: false,
        codigo: 200,
        message: "PostIt deleted",
      };
    }
    res.send(response);
  });
app.use(function (req, res, next) {
  response = {
    error: true,
    codigo: 404,
    message: "URL not found",
  };
  res.status(404).send(response);
});
app.listen(port, () => {
  console.log("Server started. Port 3000");
});
