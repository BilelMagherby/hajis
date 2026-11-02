from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile, status

from ..config import Settings, get_settings
from ..media import save_upload
from ..schemas import UploadOut
from ..security import require_admin

router = APIRouter(prefix='/api/blog/uploads', tags=['uploads'], dependencies=[Depends(require_admin)])


@router.post('', response_model=UploadOut, response_model_by_alias=True, status_code=status.HTTP_201_CREATED)
async def upload_media(
    file: Annotated[UploadFile, File()],
    settings: Annotated[Settings, Depends(get_settings)],
) -> UploadOut:
    url, media_type, size = await save_upload(file, settings)
    return UploadOut(url=url, media_type=media_type, size=size)
