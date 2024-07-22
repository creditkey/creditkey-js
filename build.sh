docker build -t creditkey-js:latest .

id=$(docker create creditkey-js:latest)
docker cp $id:/creditkey/creditkey-js/es ~/creditkey/creditkey-js/
docker cp $id:/creditkey/creditkey-js/lib ~/creditkey/creditkey-js/
docker cp $id:/creditkey/creditkey-js/umd ~/creditkey/creditkey-js/

docker rm $id
