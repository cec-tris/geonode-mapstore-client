import os
import logging

from django import template
from django.conf import settings
from geonode.base.models import Configuration

logger = logging.getLogger(__name__)
register = template.Library()


@register.simple_tag(takes_context=True)
def get_default_home_page(context):
    return Configuration.load().default_home_page
