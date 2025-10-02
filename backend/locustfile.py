from locust import HttpUser, task, between

class DjangoUser(HttpUser):
    wait_time = between(1, 5)  # users wait between 1-5s

    @task
    def ping(self):
        self.client.get("/api/ping")  # your monitored endpoint
