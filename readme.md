/
/home
-get

/login
-get

/enroll
-post

/user
-get
-post
-patch
-delete


Create a config.env file and add the following
----------------------------------------------
NODE_ENV={development/production}
PORT=3000
DATABASE={mongoDB Cluster}
DATABASE_USERNAME={username}
DATABASE_PASSWORD={password}
JWT_SECRET={secret key}
JWT_COOKIE_EXPIRE_IN={time(in sec)}
----------------------------------------------
