### With HTTP
1. Install [Docker](https://docs.docker.com) and [Docker Compose](https://docs.docker.com/compose).

2. See [linked issue](https://github.com/judge0/judge0/issues/325#issuecomment-1140230612) to resolve internal error on MacOS. Restart Docker.

3. Download and extract the release archive:
```
wget https://github.com/judge0/judge0/releases/download/v1.13.0/judge0-v1.13.0.zip
unzip judge0-v1.13.0.zip
```

4. Run all services and wait a few seconds until everything is initialized:
```
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```

5. Your instance of Judge0 CE v1.13.0 is now available at `http://<IP ADDRESS OF YOUR SERVER>:2358`.

6. Dummy client is available at `http://<IP ADDRESS OF YOUR SERVER>:2358/dummy-client.html`

### API Docs

The API documentation is available [here](https://ce.judge0.com/)