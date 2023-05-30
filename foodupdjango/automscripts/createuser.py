import requests
import random
import string
import json

BASE_URL = 'http://192.168.0.167:8000'
DATA_FILE = 'users.json'  # File to store user data
USERNAMES_FILE = "usernames.json"
def executeCreateUser(amount_of_users):
        
    def load_json_data(file_path):
        try:
            with open(file_path, 'r') as file:
                return json.load(file)
        except IOError:
            return []
    usernames = load_json_data(USERNAMES_FILE)
    def generate_random_username():
        username = random.choice(usernames)
        return username

    def generate_random_telephone():
        prefix = '+43650'
        suffix = ''.join(random.choice(string.digits) for _ in range(6))
        return prefix + suffix

    def generate_random_email(username):
        domain = random.choice(['example.com', 'test.com', 'foo.com'])
        return '{}@{}'.format(username, domain)

    def save_user_data(users):
        with open(DATA_FILE, 'w') as file:
            json.dump(users, file)

    def create_random_user():
        username = generate_random_username()
        telephone = generate_random_telephone()
        email = generate_random_email(username)

        data = {
            'username': username,
            'telephone': telephone,
            'email': email,
        }

        response = requests.post('{}/user/create/'.format(BASE_URL), json=data)
        if response.status_code == 201:
            print('User created successfully!')
            user_data = response.json()  # Get the serialized user data from the response
            users = load_user_data()
            users.append(user_data)
            save_user_data(users)
        else:
            print(response)
            print('Failed to create user.')

    # Load user data from the file
    def load_user_data():
        try:
            with open(DATA_FILE, 'r') as file:
                return json.load(file)
        except IOError:
            return []

    # Generate and post 10 random users
    for _ in range(amount_of_users):
        create_random_user()

