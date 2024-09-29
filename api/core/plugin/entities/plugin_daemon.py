from datetime import datetime
from enum import Enum
from typing import Generic, Optional, TypeVar

from pydantic import BaseModel, ConfigDict, Field

from core.model_runtime.entities.model_entities import AIModelEntity
from core.model_runtime.entities.provider_entities import ProviderEntity
from core.tools.entities.tool_entities import ToolProviderEntityWithPlugin

T = TypeVar("T", bound=(BaseModel | dict | list | bool))


class PluginDaemonBasicResponse(BaseModel, Generic[T]):
    """
    Basic response from plugin daemon.
    """

    code: int
    message: str
    data: Optional[T]


class InstallPluginMessage(BaseModel):
    """
    Message for installing a plugin.
    """

    class Event(Enum):
        Info = "info"
        Done = "done"
        Error = "error"

    event: Event
    data: str


class PluginToolProviderEntity(BaseModel):
    provider: str
    plugin_unique_identifier: str
    plugin_id: str
    declaration: ToolProviderEntityWithPlugin


class PluginBasicBooleanResponse(BaseModel):
    """
    Basic boolean response from plugin daemon.
    """

    result: bool


class PluginModelSchemaEntity(BaseModel):
    model_schema: AIModelEntity = Field(description="The model schema.")

    # pydantic configs
    model_config = ConfigDict(protected_namespaces=())


class PluginModelProviderEntity(BaseModel):
    id: str = Field(alias="ID", description="ID")
    created_at: datetime = Field(alias="CreatedAt", description="The created at time of the model provider.")
    updated_at: datetime = Field(alias="UpdatedAt", description="The updated at time of the model provider.")
    provider: str = Field(description="The provider of the model.")
    tenant_id: str = Field(description="The tenant ID.")
    plugin_unique_identifier: str = Field(description="The plugin unique identifier.")
    plugin_id: str = Field(description="The plugin ID.")
    declaration: ProviderEntity = Field(description="The declaration of the model provider.")


class PluginNumTokensResponse(BaseModel):
    """
    Response for number of tokens.
    """

    num_tokens: int = Field(description="The number of tokens.")


class PluginStringResultResponse(BaseModel):
    result: str = Field(description="The result of the string.")


class PluginVoiceEntity(BaseModel):
    name: str = Field(description="The name of the voice.")
    value: str = Field(description="The value of the voice.")


class PluginVoicesResponse(BaseModel):
    voices: list[PluginVoiceEntity] = Field(description="The result of the voices.")


class PluginDaemonError(BaseModel):
    """
    Error from plugin daemon.
    """

    error_type: str
    message: str
    args: Optional[dict] = None


class PluginDaemonInnerError(Exception):
    code: int
    message: str

    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
