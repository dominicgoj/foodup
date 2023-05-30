#-*- coding: utf-8 -*-
import requests
import random
import string
import json

BASE_URL = 'http://192.168.0.167:8000'
DATA_FILE = 'users.json'  # File containing user data
NUM_IMAGES = 10
RESTAURANTNAMES_FILE = "restaurantnames.json"
RESTAURANTDESCRIPTION_FILE = "restaurantdescriptions.json"
RESTAURANTTAGS_FILE = "taglist.json"
def executeCreateRestaurants(num_of_restaurants):
    def load_json_data(file_path):
        try:
            with open(file_path, 'r') as file:
                return json.load(file)
        except IOError:
            return []
    restaurantnames = load_json_data(RESTAURANTNAMES_FILE)
    descriptions = load_json_data(RESTAURANTDESCRIPTION_FILE)
    tags = load_json_data(RESTAURANTTAGS_FILE)
    def generate_random_name():
        restaurantname = random.choice(restaurantnames)
        return restaurantname
    def generate_restaurant_descriptions():
        restaurant_description = random.choice(descriptions)
        return restaurant_description

    def generate_random_telephone():
        prefix = '+43650'
        suffix = ''.join(random.choice(string.digits) for _ in range(6))
        return prefix + suffix

    def generate_random_email(restaurantname):
        # Konvertiere zu Kleinbuchstaben
        lowercase_string = restaurantname[0].lower()
        
        # Ersetze Leerzeichen durch Unterstriche
        no_space_string = lowercase_string.replace(" ", "_")
        
        # Ersetze Umlaute
        umlaut_replacements = {"ä": "ae", "ö": "oe", "ü": "ue"}
        umlaut_string = ''.join(umlaut_replacements.get(c, c) for c in no_space_string)
        
        # Ersetze Sonderbuchstaben
        special_replacements = {"é": "e"}  # Ergänze weitere Ersetzungen nach Bedarf
        email_string = ''.join(special_replacements.get(c, c) for c in umlaut_string)

        domain = random.choice(['example.com', 'test.com', 'foo.com'])
        return '{}@{}'.format(email_string.encode('utf-8'), domain)


    def generate_random_street():
        street_name = ''.join(random.choice(string.ascii_lowercase) for _ in range(random.randint(4, 8)))
        street_number = str(random.randint(1, 20))
        return street_name + ' ' + street_number
    def generate_random_tag():
        random_tag = random.choice(tags)
        return random_tag
    def generate_random_zip():
        return str(random.randint(1000, 10000))

    def generate_random_city():
        return ''.join(random.choice(string.ascii_lowercase) for _ in range(random.randint(4, 8)))

    def load_user_data():
        try:
            with open(DATA_FILE, 'r') as file:
                return json.load(file)
        except IOError:
            return []

    def create_random_restaurants(num_restaurants):
        users = load_user_data()
        if not users:
            print("No user data found")
            return
        restaurants = []

        for _ in range(num_restaurants):
            random_user = random.choice(users)
            userid = random_user['id']

            num_tags = random.randint(2, 5)
            tags = [generate_random_tag() for _ in range(num_tags)]

            # Convert tags to JSON
            tags_json = json.dumps(tags)
            random_restaurant_name = generate_random_name(),
            data = {
                'restaurant_name': random_restaurant_name,
                'latitude_gps': '{:.5f}'.format(random.uniform(46.5, 46.7)),
                'longitude_gps': '{:.5f}'.format(random.uniform(14.1, 14.5)),
                'telephone': generate_random_telephone(),
                'email': generate_random_email(random_restaurant_name),
                'street': generate_random_street(),
                'zip': generate_random_zip(),
                'city': generate_random_city(),
                'userid': userid,
                'tags': tags_json,
                'active': True,
                'description': generate_restaurant_descriptions(),
                'website': 'www.dummywebsite.com'
            }

            image_index = random.randint(0, NUM_IMAGES - 1)
            title_image = 'image%d' % image_index
            title_image_preview = 'image%d' % image_index

            files = {
                'title_image': open('restaurantimages/%s.jpg' % title_image, 'rb'),
                'title_image_preview': open('restaurantimages/%s.jpg' % title_image_preview, 'rb'),
            }

            # Rest of the code...
           
            
            response = requests.post('{}/restaurant/create/2'.format(BASE_URL), files=files, data=data)
            if response.status_code == 201:
                print("Restaurant created successfully!")
                restaurant_data = response.json()  # Retrieve the JSON response from the API
                restaurant = restaurant_data.get('restaurant')  # Extract the restaurant ID
                if restaurant:
                    restaurants.append(restaurant)  # Add the ID to the list

            else:
                print("Failed to create restaurants")

            # Save the restaurant IDs in a JSON file
            with open('restaurants.json', 'w') as file:
                json.dump(restaurants, file)
            if response.status_code == 201:
                print("Restaurant created successfully!")
            else:
                print("Failed to create restaurants")

    # Generate and post 20 random restaurants
    create_random_restaurants(num_of_restaurants)

