from django.db import models

def upload_profile_pic(instance, filename):
    return 'profile_pic/{0}_{1}_{2}'.format(instance.id, instance.name, filename) 
def upload_addhar_back(instance, filename):
    return 'addhar/{0}_{1}_{2}_back'.format(instance.id, instance.name, filename) 
def upload_addhar_front(instance, filename):
    return 'addhar/{0}_{1}_{2}_front'.format(instance.id, instance.name, filename)

class Farmer(models.Model):
    name = models.CharField(max_length=255)
    dob = models.DateField()
    age = models.IntegerField(default=18)
    phone = models.CharField(max_length=20, unique=True)
    address1 = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255)
    address3 = models.CharField(max_length=255, blank=True, null=True)
    dist = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pin = models.CharField(max_length=20)
    addhar_number = models.BigIntegerField(unique=True)
    addhar_front = models.ImageField(upload_to=upload_addhar_front)
    addhar_back = models.ImageField(upload_to=upload_addhar_back)
    profile_image = models.ImageField(upload_to=upload_profile_pic)
    password = models.CharField(max_length=100)
    agree = models.IntegerField(default=0)

    def __str__(self):
        return self.name
