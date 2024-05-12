from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """
    Read: all; otherwise, must be owner
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Write permissions are only allowed to the owner of the object.
        # True means is owner
        return obj.owner == request.user
