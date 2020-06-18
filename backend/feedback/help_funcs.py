from account.models import Account
from django.http import HttpResponse

def get_or_create_anon_user(email):
    if email:
        u = get_object_or_404(Account, email = email)
    else:
        u = Account.objects.create_user(email = 'anonym@anonym.com', first_name = '', last_name = '', phone_number = '')
        u.email = f'unlogged_{u.id}@anonym.com'
        u.is_active = True
        Order.objects.create(owner = u)
        u.save()
    
    return u

def try_add_rate(u, p, rating):
    if u in p.rated:
        response = HttpRespone('refused')
    else:
        u = Account.objects.get(email = email)
        p.rated.add(u)
        count = p.reviews
        new_rating = ((p.rating * count) + rating) / (count + 1)
        p.rating = round(new_rating, 1)
        p.reviews += 1
        p.save()
        response = HttpResponse('allowed')

    return response