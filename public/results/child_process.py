import json
import os
import pathlib

from engine import train_one_epoch, evaluate

import numpy as np
import pandas as pd
from PIL import Image
import cv2

import torch
from torch.optim.lr_scheduler import StepLR
import torchvision
from torchvision import transforms as T
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection.mask_rcnn import MaskRCNNPredictor

from sahi.model import TorchVisionDetectionModel
from sahi.predict import get_sliced_prediction, predict, get_prediction
from sahi.utils.file import download_from_url
from sahi.utils.cv import read_image


#retrieving PATH from json file
f = open('CONFIG.json')
data = json.load(f)
path = pathlib.Path(data['PATH_TO_IMAGES'])
print(path)

for i, name in enumerate(os.listdir(path)):
    os.rename(path / name, path / (f"new_name{i}" + '.jpg'))


model_path = "/mnt/shared_storage/Python/Notebooks/White Bears/polar_bear_fasterrcnn_resnet50_fpn_v1.pt"

model = torch.load(model_path)
model.eval()


def draw_bbox(img, bbox, color=(255, 0, 0), thickness=10):
    # img = img.copy()
    return cv2.rectangle(img, (bbox[0], bbox[1]), (bbox[0] + bbox[2],
                               bbox[1] + bbox[3]), color=color,
                               thickness=thickness)


model_type = "torchvision"
model_device = 'cuda:0'
# model_device = "cpu"
model_confidence_threshold = 0.99
model_input_size = 800


detection_model = TorchVisionDetectionModel(
    model=model,
    confidence_threshold=model_confidence_threshold,
    image_size=model_input_size,
    device=model_device, 
    load_at_init=True,
)

slice_height = 800
slice_width = 800
overlap_height_ratio = 0.1
overlap_width_ratio = 0.1


predict(
    model_type=model_type,
    detection_model=detection_model,
    source='path',
    slice_height=slice_height,
    slice_width=slice_width,
    overlap_height_ratio=overlap_height_ratio,
    overlap_width_ratio=overlap_width_ratio,
    project='AppTest',
    name='first',
    export_pickle=True,
    # novisual=True
)

# path = 'AppTest/first/pickles/'
items = len(os.listdir(path))

# bboxes_list = []

for i in range(items):
    # img = Image.open('PolarBearsDataset/AppTest/'+str(i)+'.jpg')
    img = cv2.imread(path+str(i)+'.jpg')
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    obj = pd.read_pickle('AppTest/first/pickles'+str(i)+'.pickle')
    bboxes = [i.to_coco_annotation().bbox for i in obj]
    if bboxes:
        for bb in bboxes:
            draw_bbox(img, bb)
        Image.fromarray(img).save('AppTest/first/' + str(i) + '.png')