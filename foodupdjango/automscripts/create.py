import createrestaurants
import createuser
import createposts
import createlikes
import os

# Specify the file paths
restaurants_file = 'restaurants.json'
users_file = 'users.json'
posts_file = 'posts.json'

# Delete the files if they exist
if os.path.exists(restaurants_file):
    os.remove(restaurants_file)
    print("File {} deleted.".format(restaurants_file))
else:
    print ("File {} not found.".format(restaurants_file))

if os.path.exists(users_file):
    os.remove(users_file)
    print ("File {} deleted.".format(users_file))
else:
    print ("File {} not found.".format(users_file))

if os.path.exists(posts_file):
    os.remove(posts_file)
    print ("File {} deleted.".format(posts_file))
else:
    print ("File {} not found.".format(posts_file))


createuser.executeCreateUser(200)
createrestaurants.executeCreateRestaurants(100)
createposts.executeCreatePosts(300)
createlikes.executeCreateLikes(600)