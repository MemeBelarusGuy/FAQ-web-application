<b>How to run project:</b>
<p>1.Create empty folder.</p>
<p>2.There create 2 empty folders:backend and frontend.</p>
<p>3.Download main branch.Then insert backend folder into your backend folder of whole project.</p>
<p>4.Download master branch.Then move all files and folders into your frontend folder of whole project.</p>
<p>5.cd backend->npm install</p>
<p>6.BEFORE RUN PROJECT CREATE MONGODB AND SET URL INTO dbURL(backend->index.js)</p>
<p>7.cd frontend->npm install</p>
<p>8.cd backend->npm start</p>
<p>9.cd frontend->npm start</p>

This is how your terminal  look like:

![terminal](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/terminal.png)


<br><br>
<i>Your mongoDB will contain 3 collections:users,posts,comments</i><br><br>

This is how your mongoDB look like:

![login](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/mongoDB.png)


<i>Go to browser console and write store.getState() to get info about auth/posts</i><br><br>
<i>Comments not stores into store due to dynamic querys</i><br><br>
<i>ALL PICTURES THAT YOU UPLOAD WILL STORE IN BACKEND/UPLOADS</i><br><br>
<i>To create admin go to your mongoDB user collection and add new field: admin:"true"</i><br><br>
Login:

![login](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/login.png)

Register:

![Register](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/register.png)

Fresh Posts:

![Fresh Posts](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/freshPosts.png)

Popular Posts:

![Popular Posts](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/popularPosts.png)

Add Post Image:

![Add Post Image](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/addpost_image.png)

Add Post Info:

![Add Post Info](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/addpost_info.png)

Full Post:

![Full Post](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/fullPost.png)

editComment:

![editComment](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/editComment.png)

deleteComment:

![deleteComment](https://github.com/MemeBelarusGuy/FAQ-web-application/blob/main/deleteComment.png)

