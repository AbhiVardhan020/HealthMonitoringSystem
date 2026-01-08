import tensorflow as tf
from ml.disease_system import DiseaseSymptomSystem

def load_system():
    disease_model = tf.keras.models.load_model("weights_disease/disease_model")
    autoencoder = tf.keras.models.load_model("weights_disease/autoencoder")
    encoder = tf.keras.models.load_model("weights_disease/encoder")

    system = DiseaseSymptomSystem(
        disease_model=disease_model,
        autoencoder=autoencoder,
        encoder=encoder
    )

    system.load_data()
    system.preprocess_data(test_size=0.2, random_state=42)

    return system
