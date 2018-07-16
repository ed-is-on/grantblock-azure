composer network install -a $1@$2.bna -c PeerAdmin@hlfv1
composer network start --networkName $1 --networkVersion $2 -c PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw

