import requests
import random
import string
import json

BASE_URL = 'http://192.168.0.167:8000'
USERS_FILE = 'users.json'  # File containing user data
POSTS_FILE = 'posts.json'  # File containing post data
def executeCreateLikes(num_iterations):
    def generate_random_hex_identifier():
        return ''.join(random.choice(string.hexdigits) for _ in range(32))

    def load_json_data(file_path):
        try:
            with open(file_path, 'r') as file:
                return json.load(file)
        except IOError:
            return []

    def create_random_like_and_notification():
        users = load_json_data(USERS_FILE)
        if not users:
            print("No user data found")
            return

        posts = load_json_data(POSTS_FILE)
        if not posts:
            print("No post data found")
            return

        # Pick a random user
        random_user = random.choice(users)
        acting_user_id = random_user['id']

        # Pick a random post
        random_post = random.choice(posts)
        comment_id = random_post['id']
        restaurant_id = random_post['restaurant_id']
        userid_posted = random_post['userid_posted']

        # Check if the user has already liked the post
        if 'liked_posts' in random_user and comment_id in random_user['liked_posts']:
            print("User already liked this post")
            return

        # Generate a random hex identifier
        hex_identifier = generate_random_hex_identifier()

        # Create the dataset for the like
        like_data = {
            'hex_identifier': hex_identifier,
            'userid': acting_user_id,
            'restaurantid': restaurant_id,
            'commentid': comment_id,
            'userid_got_like': userid_posted
        }

        # Send the request to create a like
        like_response = requests.post('{}/like/create/'.format(BASE_URL), data=like_data)
        if like_response.status_code == 201:
            print("Like created successfully!")
            # Update the user's liked_posts list
            if 'liked_posts' not in random_user:
                random_user['liked_posts'] = []
            random_user['liked_posts'].append(comment_id)
        else:
            print("Failed to create like")
            return

        # Create the dataset for the first notification
        notification_data1 = {
            'hex_identifier': hex_identifier,
            'userid': userid_posted,
            'visible': True
        }

        # Send the first notification request
        notification_response1 = requests.post('{}/notification/create/'.format(BASE_URL), data=notification_data1)
        if notification_response1.status_code == 201:
            print("First notification created successfully!")
        else:
            print("Failed to create first notification")
            return

        # Create the dataset for the second notification
        notification_data2 = {
            'hex_identifier': hex_identifier,
            'userid': acting_user_id,
            'visible': True
        }

        # Send the second notification request
        notification_response2 = requests.post('{}/notification/create/'.format(BASE_URL), data=notification_data2)
        if notification_response2.status_code == 201:
            print("Second notification created successfully!")
        else:
            print("Failed to create second notification")

        # Update the users.json file with the updated liked_posts list
        with open(USERS_FILE, 'w') as file:
            json.dump(users, file, indent=4)

    # Define the number of iterations
    # Iterate over the defined number of times
    for _ in range(num_iterations):
        create_random_like_and_notification()
