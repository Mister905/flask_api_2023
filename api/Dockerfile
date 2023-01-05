FROM python:3.11.1
EXPOSE 5000
# copy the requirements file into the image
COPY ./requirements.txt /api/requirements.txt
# switch working directory
WORKDIR /api
# install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt
# copy every content from the local file to the image
COPY . /api
CMD ["flask", "run", "--host", "0.0.0.0"]