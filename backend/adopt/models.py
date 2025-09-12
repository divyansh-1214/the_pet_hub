from django.db import models

class Pet(models.Model):
    # Unique ID (using UUID for uniqueness)

    # Basic Information
    name = models.CharField(max_length=100)
    type = models.CharField(
        max_length=20,
        choices=[
            ("dog", "Dog"),
            ("cat", "Cat"),
            ("bird", "Bird"),
            ("rabbit", "Rabbit"),
            ("other", "Other"),
        ],
    )
    breed = models.CharField(max_length=100, blank=True, null=True)
    age = models.CharField(max_length=50)   # you can later replace with IntegerField + unit

    # Attributes
    gender = models.CharField(
        max_length=10,
        choices=[("male", "Male"), ("female", "Female")],
    )
    size = models.CharField(
        max_length=10,
        choices=[("small", "Small"), ("medium", "Medium"), ("large", "Large")],
    )
    color = models.CharField(max_length=50)

    # Location and Shelter
    location = models.CharField(max_length=200)
    shelter = models.CharField(max_length=200, blank=True, null=True)

    # Details
    description = models.TextField()
    personality = models.CharField(max_length=255, blank=True, default="")   # stores "playful,calm,..."
    goodWith = models.CharField(max_length=255, blank=True, default="")      # stores "children,dogs,..."
    specialNeeds = models.CharField(max_length=255, blank=True, default="")  # stores "diet,medicine,..."

    # Adoption
    adoptionFee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    images =  models.ImageField(upload_to="pet/", blank=True, null=True)

    # Health
    vaccinated = models.BooleanField(default=False)
    spayedNeutered = models.BooleanField(default=False)
    houseTrained = models.BooleanField(default=False)

    # Metadata
    datePosted = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-datePosted"]

    def __str__(self):
        return f"{self.name} ({self.type})"
