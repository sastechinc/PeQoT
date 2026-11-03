/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT User Profile Editor & Preview Suite
 * Brand: SAS Tech Inc.
 */

import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Heart, 
  Eye, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  FileBadge
} from 'lucide-react';
import { UserProfile, Gender, RelationshipIntention } from '../../types/peqot';
import { peqotStore, calculateAge } from '../../lib/peqotStore';
import { COUNTRIES, RELATIONSHIP_INTENTIONS, INTEREST_TAGS, LANGUAGE_OPTIONS } from '../../data/constants';

interface ProfileEditorProps {
  onOpenVerification: () => void;
  onPreviewPublic: (user: UserProfile) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  onOpenVerification,
  onPreviewPublic
}) => {
  const [user, setUser] = useState<UserProfile>(() => peqotStore.getCurrentUser());
  const [displayName, setDisplayName] = useState(user.display_name);
  const [birthDate, setBirthDate] = useState(user.birth_date);
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [bio, setBio] = useState(user.bio);
  const [relationshipIntention, setRelationshipIntention] = useState(user.relationship_intention);
  const [occupation, setOccupation] = useState(user.occupation || '');
  const [education, setEducation] = useState(user.education || '');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(user.languages);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user.interests);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const calculatedAge = birthDate ? calculateAge(birthDate) : user.age;
  const isUnderage = birthDate !== '' && calculatedAge < 18;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (isUnderage) {
      setFeedback({ type: 'error', message: 'Calculated age is under 18. PeQoT policy strictly bans minors.' });
      return;
    }

    const res = peqotStore.updateProfile({
      display_name: displayName,
      birth_date: birthDate,
      gender,
      country,
      city,
      bio,
      relationship_intention: relationshipIntention,
      occupation,
      education,
      languages: selectedLanguages,
      interests: selectedInterests
    });

    if (res.success) {
      setUser(peqotStore.getCurrentUser());
      setFeedback({ type: 'success', message: 'Profile updated successfully.' });
      setTimeout(() => setFeedback(null), 4000);
    } else {
      setFeedback({ type: 'error', message: res.error || 'Failed to update profile.' });
    }
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const currentPhotos = [...user.photos];
    currentPhotos.push({
      id: 'photo_' + Date.now(),
      url: newPhotoUrl.trim(),
      is_primary: currentPhotos.length === 0,
      created_at: new Date().toISOString()
    });

    peqotStore.updateProfile({ photos: currentPhotos });
    setUser(peqotStore.getCurrentUser());
    setNewPhotoUrl('');
    setFeedback({ type: 'success', message: 'Photo added and saved to Firebase.' });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFeedback({ type: 'error', message: 'Photo size exceeds 5MB limit. Please choose a smaller image.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const currentPhotos = [...user.photos];
        currentPhotos.push({
          id: 'photo_upload_' + Date.now(),
          url: dataUrl,
          is_primary: currentPhotos.length === 0,
          created_at: new Date().toISOString()
        });
        peqotStore.updateProfile({ photos: currentPhotos });
        setUser(peqotStore.getCurrentUser());
        setFeedback({ type: 'success', message: 'Photo uploaded and saved to Firebase Cloud.' });
        setTimeout(() => setFeedback(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you certain you want to permanently take down your account, photos, and profile from Firebase Cloud? This action is irreversible.')) {
      await peqotStore.deleteAccount(user.id);
      setUser(peqotStore.getCurrentUser());
      setFeedback({ type: 'success', message: 'Your profile and uploads have been permanently removed from Firebase.' });
    }
  };

  const handleSetPrimaryPhoto = (id: string) => {
    const updated = user.photos.map(p => ({
      ...p,
      is_primary: p.id === id
    }));
    peqotStore.updateProfile({ photos: updated });
    setUser(peqotStore.getCurrentUser());
  };

  const handleDeletePhoto = (id: string) => {
    if (user.photos.length <= 1) {
      alert('You must maintain at least one profile photo.');
      return;
    }
    const updated = user.photos.filter(p => p.id !== id);
    if (!updated.some(p => p.is_primary) && updated.length > 0) {
      updated[0].is_primary = true;
    }
    peqotStore.updateProfile({ photos: updated });
    setUser(peqotStore.getCurrentUser());
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const toggleInterest = (tag: string) => {
    if (selectedInterests.includes(tag)) {
      setSelectedInterests(selectedInterests.filter(t => t !== tag));
    } else {
      setSelectedInterests([...selectedInterests, tag]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-left space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div>
          <h1 className="text-2xl font-bold font-serif-display text-slate-900">
            Profile Settings
          </h1>
          <p className="text-xs text-slate-500">
            Manage your personal representation, authentic photos, and privacy
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onPreviewPublic(user)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Preview Public View</span>
          </button>

          <button
            onClick={onOpenVerification}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              user.is_verified 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-[#900B4B] border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{user.is_verified ? 'Identity Verified' : 'Submit ID Verification'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Photos Management Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-serif-display text-slate-900">
              Profile Photographs
            </h3>
            <p className="text-xs text-slate-500">
              Add clear, authentic portraits. High-clarity photos receive 3x more mutual matches.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {user.photos.map((photo) => (
            <div key={photo.id} className="relative group rounded-2xl overflow-hidden aspect-square border-2 border-slate-100">
              <img
                src={photo.url}
                alt="Profile photo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {photo.is_primary && (
                <div className="absolute top-2 left-2 bg-[#900B4B] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                  Primary
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!photo.is_primary && (
                  <button
                    onClick={() => handleSetPrimaryPhoto(photo.id)}
                    className="p-1.5 rounded-lg bg-white text-slate-900 text-[10px] font-semibold hover:bg-rose-50"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Add Photo Input & Upload */}
          <div className="p-3 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/40 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
            <Camera className="w-5 h-5 text-[#900B4B]" />
            <label className="cursor-pointer px-2.5 py-1 bg-white border border-rose-300 hover:border-[#900B4B] text-[10px] font-semibold text-[#900B4B] rounded-lg shadow-xs transition-colors">
              <span>Choose Photo File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <div className="w-full flex items-center gap-1 pt-1">
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="or paste URL"
                className="w-full text-[9px] px-1.5 py-1 bg-white border border-rose-200 rounded text-center"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="text-[10px] font-bold text-[#900B4B] hover:underline shrink-0"
              >
                +Add
              </button>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight">
              Stored securely in Firebase Cloud
            </p>
          </div>
        </div>
      </div>

      {/* Main Profile Fields Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold font-serif-display text-slate-900 border-b border-rose-100/60 pb-3">
          Personal Information & Biography
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Display Name</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Date of Birth</label>
              <span className="text-[11px] font-bold text-[#900B4B]">Age: {calculatedAge}</span>
            </div>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            >
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">City / General Area</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Biography</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Share your values, passions, and what you cherish in life..."
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Relationship Intention</label>
            <select
              value={relationshipIntention}
              onChange={(e) => setRelationshipIntention(e.target.value as RelationshipIntention)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            >
              {RELATIONSHIP_INTENTIONS.map(i => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Occupation</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g. Architect, Researcher"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Education</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. University Graduate"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E11D74]"
            />
          </div>
        </div>

        {/* Spoken Languages */}
        <div className="space-y-2 pt-2 border-t border-rose-50">
          <label className="text-xs font-semibold text-slate-700">Spoken Languages</label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map(lang => {
              const selected = selectedLanguages.includes(lang);
              return (
                <button
                  type="button"
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    selected 
                      ? 'bg-[#900B4B] text-white font-medium' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interests & Passions */}
        <div className="space-y-2 pt-2 border-t border-rose-50">
          <label className="text-xs font-semibold text-slate-700">Interests & Hobbies</label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map(tag => {
              const selected = selectedInterests.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    selected 
                      ? 'bg-[#E11D74] text-white font-medium' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#900B4B] to-[#E11D74] hover:opacity-95 rounded-xl shadow-md transition-all"
          >
            Save Profile Changes
          </button>
        </div>

      </form>

      {/* Danger Zone: Permanent Cloud Account Removal */}
      <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-rose-900 font-serif-display">
              Take Down Account from Firebase
            </h4>
            <p className="text-xs text-rose-700/80 leading-relaxed max-w-xl">
              Your profile, uploaded photos, and messages remain active in the cloud database until you explicitly choose to take them down. Deleting your account will immediately remove your data from Firebase and the global discovery feed.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="px-4 py-2 text-xs font-bold text-rose-700 bg-white border border-rose-300 hover:bg-rose-600 hover:text-white rounded-xl shadow-xs transition-colors shrink-0"
          >
            Permanently Take Down Profile
          </button>
        </div>
      </div>

    </div>
  );
};
