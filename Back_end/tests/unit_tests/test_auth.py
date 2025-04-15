import unittest
from src.microservices.service_auth.app import app

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_register_and_login(self):
        # Test user registration
        response = self.app.post('/register', json={
            "username": "testuser",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 201)

        # Test login with the registered user
        response = self.app.post('/login', json={
            "username": "testuser",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "success")

if __name__ == '__main__':
    unittest.main()
