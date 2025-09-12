from django.db import models


class VeterinaryClinic(models.Model):
    name = models.CharField(max_length=255)
    specialties = models.TextField(default="", help_text="Comma-separated list of specialties")
    emergency_24_7 = models.BooleanField(default=False)

    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    review_count = models.IntegerField(default=0)

    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    phone = models.CharField(max_length=20)
    distance_miles = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)

    # Clinic image
    image = models.ImageField(upload_to="clinics/", blank=True, null=True)

    # Services offered (checkups, vaccinations, surgery, etc.)
    # services = models.ManyToManyField("Service", related_name="clinics")
    # services = models.ManyToManyField("Service", related_name="clinics")
    services = models.TextField(default="", help_text="Comma-separated list of specialties")

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
