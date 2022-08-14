import { Schema, model, Model } from "mongoose";
import TrackInterface from "../interfaces/tracks.interface";
import mongooseDelete from "mongoose-delete";

interface TracksModelExt extends Model<TrackInterface> {
  findAllData(): any;
}

const TracksScheme = new Schema<any>(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: String,
    },
  },
  {
    timestamps: true, //TODO createdAt, updatedAt - fecha de actualizacion
    versionKey: false,
  }
);

/**
 * Implementar metodo propio con relacion a storage
 * @param {*} name
 * @returns
 */
TracksScheme.statics.findAllData = function (name) {
  const joinData = this.aggregate([
    // modelo Tracks
    {
      $lookup: {
        from: "storages", // Relacion a storages
        localField: "mediaId", // Campo de la tabla mediaId
        foreignField: "_id", // relacion a Storages._id
        as: "audio", // Nombre de la relacion, su alias
      },
    },
    { $unwind: "$audio" },
  ]);
  return joinData;
};

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    // modelo Tracks
    { $match: { _id: id } },
    {
      $lookup: {
        from: "storages", // Relacion a storages
        localField: "mediaId", // Campo de la tabla mediaId
        foreignField: "_id", // relacion a Storages._id
        as: "audio", // Nombre de la relacion, su alias
      },
    },
    { $unwind: "$audio" },
  ]);
  return joinData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
const TrackModel = model<TrackInterface, TracksModelExt>(
  "tracks",
  TracksScheme
);
export default TrackModel;
