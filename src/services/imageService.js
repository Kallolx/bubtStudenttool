const API_URL = "https://api-inference.huggingface.co/models/dreamlike-art/dreamlike-photoreal-2.0";

export async function generateImage(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          negative_prompt: "ugly, blurry, poor quality, distorted, deformed, disfigured, bad anatomy, watermark",
          num_inference_steps: 30,
          guidance_scale: 7.5,
          width: 768,
          height: 768,
        },
        options: {
          wait_for_model: true,
          use_cache: true
        }
      }),
    });

    if (response.status === 503) {
      throw new Error("The model is still loading. Please try again in 10-20 seconds.");
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to generate image');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
} 