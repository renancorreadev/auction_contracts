#relations

<p>
bids[0x123] = 40
bids[0xabc] = 70
bidIncrement = 40
highestBidder = 0xabc...
highestBindingBid = 50.
</p>
-------------------------\
<p>
0x1234... is sending 15 wei 
bids[0x123] = 40+15 = 55
highestBindingBid = min(55+10,70) = 65
</p>
