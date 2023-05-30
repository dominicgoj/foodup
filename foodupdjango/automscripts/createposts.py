import requests
import random
import string
import json

BASE_URL = 'http://192.168.0.167:8000'
USERS_FILE = 'users.json'  # File containing user data
RESTAURANTS_FILE = 'restaurants.json'  # File containing restaurant data
POSTS_FILE = 'posts.json'
COMMENTS_FILE = 'comments.json'
NUM_IMAGES = 10
def executeCreatePosts(num_posts):
    def load_json_data(file_path):
        try:
            with open(file_path, 'r') as file:
                return json.load(file)
        except IOError:
            return []
        
    comments = load_json_data(COMMENTS_FILE)
    
    def generate_random_comment():
        randomcomment = random.choice(comments)
        
        return randomcomment['comment'], randomcomment['rating']

    def generate_random_hex_identifier():
        return ''.join(random.choice(string.hexdigits) for _ in range(32))

    
        
    def load_posts_data():
        try:
            with open(POSTS_FILE, 'r') as file:
                return json.load(file)
        except IOError:
            return []
    def save_posts_data(posts):
        with open(POSTS_FILE, 'w') as file:
            json.dump(posts, file)

    def create_random_post():
        users = load_json_data(USERS_FILE)
        if not users:
            print("No user data found")
            return

        restaurants = load_json_data(RESTAURANTS_FILE)
        if not restaurants:
            print("No restaurant data found")
            return

        random_user = random.choice(users)
        userid_posted = random_user['id']

        random_restaurant = random.choice(restaurants)
        restaurant_id = random_restaurant['id']
        restaurant_userid = random_restaurant['userid']
        comment, rating = generate_random_comment()
        data = {
            'userid_posted': userid_posted,
            'rating': rating,
            'comment': comment,
            'restaurant_id': restaurant_id,
            'hex_identifier': generate_random_hex_identifier(),
            'active': True
        }
        random_file_ext = random.randint(0, NUM_IMAGES - 1)
        files = {
            'image': open('postsimages/image{}.jpg'.format(random_file_ext), 'rb'),
            'image_preview': open('postsimages/image{}.jpg'.format(random_file_ext), 'rb'),
        }

        response = requests.post('{}/post/create/'.format(BASE_URL), files=files, data=data)
        if response.status_code == 201:
            print("Post created successfully!")
            # Retrieve the response data
            post_data = response.json()
            posts = load_posts_data()
            posts.append(post_data)
            save_posts_data(posts)

            # Create a notification for the post
            notification_data = {
                'hex_identifier': data['hex_identifier'],
                'userid': restaurant_userid,
                'visible': True
            }

            notification_response = requests.post('{}/notification/create/'.format(BASE_URL), data=notification_data)
            if notification_response.status_code == 201:
                print("Notification created successfully!")
            else:
                print("Failed to create notification")
        else:
            print("Failed to create post")


    for _ in range(num_posts):
        create_random_post()

