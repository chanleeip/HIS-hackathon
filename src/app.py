from flask import Flask,request,jsonify
from flask_cors import CORS
import pymongo
import datetime


app=Flask(__name__)
CORS(app)

server = pymongo.MongoClient("mongodb+srv://chanleeip4:nithin@cluster0.ulg7ukt.mongodb.net/?retryWrites=true&w=majority")
Nft_DB = server['NFT']
Nft_details = Nft_DB['Nft_details']

@app.route('/send_data',methods=['POST'])
def send_data():
    data = request.get_json()
    publickey = data['the_original_public_key']
    description = data['description']
    lines = description.splitlines()
    first_line = lines[0]
    NFTaddress = data['better_key']
    current_date = datetime.date.today()
    next_year = current_date + datetime.timedelta(days=365)
    Nft_details.insert_one({'Public_Id':publickey, 'NFT_Address':NFTaddress, 'Title':first_line, 'Expire_Date':str(next_year)})
    return jsonify({'success':True})

@app.post('/get_data')
def get_data():
    data = request.get_json()
    publickey = data['public_key']
    result = list(Nft_details.find({'Public_Id':publickey},{'_id':0}))
    return jsonify({'success':True, 'result':result})

@app.post('/title')
def title_name():
    data = request.get_json()
    tokenid = data['addr']
    result = list(Nft_details.find({'NFT_Address':tokenid},{'_id':0}))
    title = result[0]['Title']
    expiry = result[0]['Expire_Date']
    return jsonify({'success':True,'result':title, 'exp':expiry})


if __name__=="__main__":
    app.run(debug=True)