from ninja import NinjaAPI
from prometheus_client import Counter
api = NinjaAPI()

api_requests_total = Counter("api_requests_total", "Total API Requests")
@api.get("/ping")
def ping(request):
    api_requests_total.inc()
    return {"message": "pong"}