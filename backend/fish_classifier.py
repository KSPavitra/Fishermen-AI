"""
Fishermen-AI: MobileNetV3 Arabian Sea Fish Classifier Service
Runs inference using the fine-tuned MobileNetV3 ONNX model on 10 Coastal Karnataka species.
"""

import os
import json
import numpy as np
from PIL import Image
import onnxruntime as ort

MODEL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'models'))
ONNX_PATH = os.path.join(MODEL_DIR, 'fish_mobilenet_v3.onnx')
CLASSES_PATH = os.path.join(MODEL_DIR, 'fish_classes.json')

class FishClassifierService:
    def __init__(self):
        self.session = None
        self.classes = []
        self._load_classes()
        self._load_model()

    def _load_classes(self):
        try:
            if os.path.exists(CLASSES_PATH):
                with open(CLASSES_PATH, 'r', encoding='utf-8') as f:
                    self.classes = json.load(f)
            else:
                print(f"⚠️ Warning: {CLASSES_PATH} not found.")
        except Exception as e:
            print(f"[Warning] Failed to load fish classes: {e}")

    def _load_model(self):
        try:
            if os.path.exists(ONNX_PATH):
                self.session = ort.InferenceSession(ONNX_PATH)
                self.input_name = self.session.get_inputs()[0].name
                print(f"[Info] Loaded MobileNetV3 ONNX model from {ONNX_PATH}")
            else:
                print(f"[Warning] {ONNX_PATH} not found.")
        except Exception as e:
            print(f"[Error] Failed to load ONNX model: {e}")

    def preprocess_image(self, image: Image.Image) -> np.ndarray:
        """
        Preprocesses a PIL Image to [1, 3, 224, 224] normalized tensor (ImageNet stats)
        """
        # Convert to RGB
        image = image.convert('RGB')
        # Resize to 224x224
        image = image.resize((224, 224), Image.Resampling.BILINEAR)

        # Convert to numpy array float32 [0, 1]
        img_np = np.array(image).astype(np.float32) / 255.0

        # Standard ImageNet normalization
        mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
        std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
        img_norm = (img_np - mean) / std

        # Transpose from [H, W, C] to [C, H, W]
        img_chw = np.transpose(img_norm, (2, 0, 1))

        # Add batch dimension: [1, 3, 224, 224]
        return np.expand_dims(img_chw, axis=0)

    def predict(self, image: Image.Image):
        """
        Runs MobileNetV3 inference on a PIL image and returns top predictions.
        """
        if not self.session or not self.classes:
            return None

        tensor = self.preprocess_image(image)
        outputs = self.session.run(None, {self.input_name: tensor})
        probabilities = outputs[0][0]

        top_indices = np.argsort(probabilities)[::-1]
        top_results = []

        for idx in top_indices[:3]:
            cls_info = self.classes[idx]
            top_results.append({
                'id': int(idx),
                'key': cls_info['key'],
                'name': cls_info['name'],
                'kannada': cls_info['kannada'],
                'scientific_name': cls_info.get('scientific_name', ''),
                'confidence': round(float(probabilities[idx]) * 100, 1),
                'probability': float(probabilities[idx]),
                'price': cls_info['price'],
                'range': f"₹{cls_info['min_price']} - ₹{cls_info['max_price']}",
                'season': cls_info['season'],
                'habitat': cls_info.get('habitat', ''),
                'freshness_guide': cls_info.get('freshness_guide', '')
            })

        best = top_results[0]
        return {
            'top_match': best,
            'top_3': top_results,
            'model': 'MobileNetV3-Small (Fine-Tuned for Arabian Sea Fish)',
            'backend': 'ONNX Runtime (Wasm/CPU/WebGL)'
        }

# Global singleton
fish_classifier = FishClassifierService()
