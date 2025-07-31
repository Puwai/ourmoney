from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import Invoice, Client

def dashboard(request):
    invoices = Invoice.objects.filter(user=request.user).order_by('-created_at') if request.user.is_authenticated else []
    return render(request, 'core/dashboard.html', {'invoices': invoices})

@api_view(['GET'])
@login_required
def invoice_list(request):
    """
    Return invoices for logged-in user.
    """
    invoices = Invoice.objects.filter(user=request.user).order_by('-created_at')
    data = []
    for invoice in invoices:
        data.append({
            'id': invoice.id,
            'client': invoice.client.name,
            'invoice_number': invoice.invoice_number,
            'amount': float(invoice.total()),
            'status': invoice.status,
            'due_date': invoice.due_date.strftime('%Y-%m-%d') if invoice.due_date else None,
        })
    return Response(data)

@api_view(['POST'])
@parser_classes([JSONParser])
@csrf_exempt
@login_required
def create_invoice(request):
    try:
        data = request.data
        client, created = Client.objects.get_or_create(
            name=data['client_name'],
            defaults={'email': 'noemail@example.com'}
        )
        invoice = Invoice.objects.create(
            user=request.user,
            client=client,
            invoice_number=data['invoice_number'],
            status=data.get('status', 'pending'),
            due_date=data['due_date']
        )
        return JsonResponse({
            'id': invoice.id,
            'message': 'Invoice created successfully'
        }, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@api_view(['GET'])
@login_required
def current_user(request):
    return JsonResponse({
        'id': request.user.id,
        'username': request.user.username,
        'email': request.user.email
    })