import Express from 'express';
import path from 'path';

const app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

app.listen(port, err => {
    console.log("Server is listening on port", port);
});
