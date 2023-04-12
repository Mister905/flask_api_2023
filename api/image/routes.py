from flask import json, request, jsonify, abort, current_app, send_from_directory
from api.image import bp
from werkzeug.utils import secure_filename
import imghdr
import os
import sys
from ..s3_functions import s3_upload_file, s3_show_image

def validate_image(stream):
    header = stream.read(512)
    stream.seek(0)
    format = imghdr.what(None, header)
    if not format:
        return None
    return '.' + (format if format != 'jpeg' else 'jpg')


@bp.route('/api/image', methods=['POST'])
def upload_file():


    my_files = request.files

    for item in my_files:        
        uploaded_file = my_files.get(item)  
        uploaded_file.filename = secure_filename(uploaded_file.filename)
        if uploaded_file.filename != '':            
            file_ext = os.path.splitext(uploaded_file.filename)[1]           
        if file_ext not in current_app.config['UPLOAD_EXTENSIONS']:            
            abort(400)

        uploaded_file.save(os.path.join(current_app.config['UPLOAD_PATH'], uploaded_file.filename))

        s3_upload_file(f"uploads/{uploaded_file.filename}", current_app.config['BUCKET'])

    return jsonify({
        "success": 1,
        "message": request.files.getlist('images')
    })


@bp.route('/api/image/all', methods=['GET'])
def get_files():

    files = s3_show_image(current_app.config['BUCKET'])

    return jsonify({
        "success": 1,
        "files": files
    })
    