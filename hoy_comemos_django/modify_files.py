# Modify all photos from a folder to 320 x 200
# keeping the ratio 
from PIL import Image 
from PIL import ImageFilter 
import os 

def main(): 
	# path of the folder containing the raw images 
	inPath ="/Users/darodriguez/personal/hoy_comemos_django/original_images/"

	# path of the folder that will contain the modified image 
	outPath ="/Users/darodriguez/personal/hoy_comemos_django/hoy_comemos/hoy_comemos_django/static/app/images/"

	for imagePath in os.listdir(inPath): 
		# imagePath contains name of the image 
		inputPath = os.path.join(inPath, imagePath) 

		# inputPath contains the full directory name 
		img = Image.open(inputPath) 

		fullOutPath = os.path.join(outPath, imagePath) 
		# fullOutPath contains the path of the output 
		# image that needs to be generated
		ratio = 320/200
		width, height = img.size
		imgRatio = width / height

		if imgRatio > ratio:
			newHeight = 200
			newWidth = int(200*imgRatio)
		else:
			newWidth = 320
			newHeight = int(320/imgRatio)

		img = img.resize((newWidth, newHeight))

		img.crop((0,0,320,200)).save(fullOutPath) 

		print(fullOutPath) 

# Driver Function 
if __name__ == '__main__': 
	main() 
